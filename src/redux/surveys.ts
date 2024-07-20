import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";



export interface ISurveyDefinition {
  id: string;
  title: string;
  description: string;
  content: any;
}
const initialState: {
  surveys: Array<ISurveyDefinition>;
  status: string;
  error: any;
} = {
  surveys: [],
  status: "idle",
  error: null,
};

const surveysSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<string>) => {
      const survey = state.surveys.filter((s) => s.id === action.payload)[0];
      const index = state.surveys.indexOf(survey);
      if (index >= 0) {
        state.surveys.splice(index, 1);
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
        // Add any fetched surveys to the array
        state.surveys = state.surveys.concat(action.payload);
      })
      .addCase(load.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add new survey to the array
        state.surveys.push(action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove survey from the array in a more functional way
        state.surveys = state.surveys.filter(
          (survey) => survey.id !== action.meta.arg
        );
      });
  },
});

export const load = createAsyncThunk("surveys/load", async () => {
	const token = localStorage.getItem('authToken');

	try {
		const response = await axios.get(`api/collection/get-all`, {
			headers: {
				 'Authorization': '' + token
			}
			}
		);



  console.log('get-all', response.data);
  return response.data;

	} catch (error) {
		console.log(error);
//		if (error.response.status === 403)
//		{
		localStorage.removeItem('authToken');
		localStorage.removeItem('admin');
//		}	
	}



 

});

export const get = createAsyncThunk("surveys/get", async (id: string) => {
	const token = localStorage.getItem('authToken');
  const response = await axios.get(`api/collection/get-one/${id}`, {
  	headers: {
			'Authorization': '' + token
  	}
	}
);
  return response.data;
});

export const create = createAsyncThunk(
  "surveys/create",
  async ({
    newSurveyTitle,
    newSurveyDescription,
  }: {
    newSurveyTitle: string;
    newSurveyDescription: string;
  }) => {
		const token = localStorage.getItem('authToken');
    const newPost = {
      title: newSurveyTitle,
      content: "",
      description: newSurveyDescription,
    };


    const response = await axios.post("api/collection/create", newPost, {
  		headers: {
				'Authorization': '' + token
  		}		
		}
	);

    return response.data;
  }
);

export const remove = createAsyncThunk("surveys/delete", async (id: string) => {
	const token = localStorage.getItem('authToken');
  const response = await axios.delete(`api/collection/delete-one/${id}`, {
  	headers: {
			'Authorization': '' + token
  	}		
	}
);

  // Assuming you want to fetch the updated list of surveys after one is deleted
  return response.data;
});

export const update = createAsyncThunk("surveys/update", async ({ id, content }: { id: string; content: any }) => {
	const token = localStorage.getItem('authToken');
    const response = await axios.put(`api/collection/update/${id}`, content, {
      headers: {
        'Authorization': '' + token
      }
    });

  return response.data;
  }
);
// export const { add, remove, update } = surveysSlice.actions
export default surveysSlice.reducer;
