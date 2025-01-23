import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { failedAuth } from '../components/Auth';


export interface ISurveyDefinition {
	id: string;
	tableName: string;
	originalFileName: string;
	createdAt: string;
}
const initialState: {
	modules: Array<ISurveyDefinition>;
	status: string;
	error: any;
} = {
	modules: [],
	status: "idle",
	error: null,
};

const modulesSlice = createSlice({
	name: "modules",
	initialState,
	reducers: {
		remove: (state, action: PayloadAction<string>) => {
			const module = state.modules.filter((s) => s.id === action.payload)[0];
			const index = state.modules.indexOf(module);
			if (index >= 0) {
				state.modules.splice(index, 1);
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
			// Add any fetched modules to the array
			state.modules = state.modules.concat(action.payload);
		})
		.addCase(load.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		})
		.addCase(create.fulfilled, (state, action) => {
			state.status = "succeeded";
			// Add new module to the array
			state.modules.push(action.payload);
		})
		.addCase(remove.fulfilled, (state, action) => {
			state.status = "succeeded";
			// Remove module from the array in a more functional way
			state.modules = state.modules.filter(
				(module) => module.id !== action.meta.arg
			);
		});
	},
});


// 
export const getTableContents = createAsyncThunk(
  "tables/getTableContents",
  async (tableName: string, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`/api/tables/data/${tableName}`, {
        headers: {
          Authorization: '' + token,
        },
      });
      return response.data; // Assuming the API returns an array of table rows
    } catch (error: any) {
      console.error("Error fetching table contents:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch table contents"
      );
    }
  }
);

// 
export const gettablename = createAsyncThunk("tables/get", async (id: string) => {
	const token = localStorage.getItem('authToken');
	const response = await axios.get(`api/tables/info/${id}`, {
		headers: {
			'Authorization': '' + token
		}
	}
	);
	return response.data;
});


export const load = createAsyncThunk("tables/load", async () => {
	const token = localStorage.getItem('authToken');

	try {
		const response = await axios.get(`api/tables/get-all`, {
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
		//localStorage.removeItem('authToken');
		//localStorage.removeItem('admin');
		//window.location.reload();
		//return {};
	}

});


export const exp = createAsyncThunk("modules/exp", async (name: string) => {
		console.log('exp');
	const token = localStorage.getItem('authToken');
	try {
		const response = await axios.get(`api/tables/export/${name}`, {
			headers: {
				'Authorization': '' + token
			}
		}
																		);

		console.log('exp', response.data);

																		return response.data;
	} catch (error) {
		console.log(error);
//		failedAuth();
	}
});



export const get = createAsyncThunk("modules/get", async (id: string) => {
	const token = localStorage.getItem('authToken');
	try {
		const response = await axios.get(`api/tables/info/${id}`, {
			headers: {
				'Authorization': '' + token
			}
		}
																		);
																		return response.data;

	} catch (error) {
		console.log(error);
		failedAuth();
	}

});


export const imp = createAsyncThunk(
	"modules/imp",
	async ({ file }: { file: File }) => {
		const token = localStorage.getItem("authToken");

		const formData = new FormData();
		formData.append("file", file); // Attach the file to the FormData object

		const response = await axios.post("api/tables/import", formData, {
			headers: {
				"Authorization": `${token}`, // Add the token for authorization
				"Content-Type": "multipart/form-data", // Set the content type
			},
		});

		return response.data;
	}
);


export const create = createAsyncThunk(
	"modules/create",
	async ({
		newModuleTitle,
		newModuleDescription,
	}: {
		newModuleTitle: string;
		newModuleDescription: string;
	}) => {
		const token = localStorage.getItem('authToken');
		const newPost = {
			title: newModuleTitle,
			content: "",
			description: newModuleDescription,
		};


		const response = await axios.post("api/tables/create", newPost, {
			headers: {
				'Authorization': '' + token
			}		
		}
																		 );

																		 return response.data;
	}
);


export const remove = createAsyncThunk("modules/delete", async (name: string) => {
	const token = localStorage.getItem('authToken');
	const response = await axios.delete(`api/tables/delete-one/${name}`, {
		headers: {
			'Authorization': '' + token
		}		
	}
																		 );

																		 // Assuming you want to fetch the updated list of modules after one is deleted
																		 return response.data;
});

export const update = createAsyncThunk("modules/update", async ({ id, content }: { id: string; content: any }) => {

	console.log(content);

	const token = localStorage.getItem('authToken');
	const response = await axios.put(`api/tables/update/${id}`, content, {
		headers: {
			'Authorization': '' + token
		}
	});

	return response.data;
}
																			);
																			// export const { add, remove, update } = modulesSlice.actions
																			export default modulesSlice.reducer;
