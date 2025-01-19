import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { failedAuth } from '../components/Auth';


export interface IUserDefinition {
  id: string;
  username: string;
  password: string;
  admin: string;
  content: any;
}
const initialState: {
  users: Array<IUserDefinition>;
  status: string;
  error: any;
} = {
  users: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<string>) => {
      const survey = state.users.filter((s) => s.id === action.payload)[0];
      const index = state.users.indexOf(survey);
      if (index >= 0) {
        state.users.splice(index, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(load.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(load.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched users to the array
        state.users = state.users.concat(action.payload);
      })
      .addCase(load.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add new survey to the array
        state.users.push(action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove survey from the array in a more functional way
        state.users = state.users.filter(
          (survey) => survey.id !== action.meta.arg
        );
      });
  },
});

export const load = createAsyncThunk("users/load", async () => {
	const token = localStorage.getItem('authToken');

	try {
		const response = await axios.get(`api/users/get-all`, {
			headers: {
				 'Authorization': '' + token
			}
			}
		);

  console.log('get-all', response.data);
  return response.data;

	} catch (error) {
		console.log(error);
    failedAuth();
	}

});

export const get = createAsyncThunk("users/get", async (id: string) => {
	const token = localStorage.getItem('authToken');
  const response = await axios.get(`api/users/get-one/${id}`, {
  	headers: {
			'Authorization': '' + token
  	}
	}
);
  return response.data;
});

export const create = createAsyncThunk(
  "users/create",
  async ({
    newUserName,
    newUserPassword,
    newUserAdmin,
  }: {
    newUserName: string;
    newUserPassword: string;
    newUserAdmin: boolean;
  }) => {
		const token = localStorage.getItem('authToken');
    const newPost = {
      username: newUserName,
      content: "",
      password: newUserPassword,
      admin: newUserAdmin,
    };


    const response = await axios.post("api/users/create", newPost, {
  		headers: {
				'Authorization': '' + token
  		}		
		}
	);

    return response.data;
  }
);

export const remove = createAsyncThunk("users/delete", async (id: string) => {
	const token = localStorage.getItem('authToken');
  const response = await axios.delete(`api/users/delete-one/${id}`, {
  	headers: {
			'Authorization': '' + token
  	}		
	}
);

  // Assuming you want to fetch the updated list of users after one is deleted
  return response.data;
});

export const update = createAsyncThunk("users/update", async ({ id, content }: { id: string; content: any }) => {
	const token = localStorage.getItem('authToken');
    const response = await axios.put(`api/users/update/${id}`, content, {
      headers: {
        'Authorization': '' + token
      }
    });

  return response.data;
  }
);
// export const { add, remove, update } = usersSlice.actions
export default usersSlice.reducer;
