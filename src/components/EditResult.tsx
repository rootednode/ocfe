import { load_one, updateResult } from "../redux/results";
import { useReduxDispatch } from "../redux";
import React, { useEffect, useState } from "react";
import { get } from "../redux/surveys";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditResult = (params: {
  id: string;
  onCancel: () => void;
}): React.ReactElement => {
  const dispatch = useReduxDispatch();
  const [data, setData] = useState<any[]>([]);
  const [surveyNameArray, setSurveyNameArray] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const surveyAction = await dispatch(get(params.id));
      const survey = JSON.parse(surveyAction?.payload.content);
      const surveyPages = survey.pages;
      const resultsAction = await dispatch(load_one(params.id));
      const data = resultsAction?.payload;
      setData(data);
      setSurveyNameArray(surveyPages);
    };

    fetchData();
  }, [dispatch, params.id]);

  const handleCellEdit = (rowIndex: number, key: string, value: any) => {
    const updatedData = [...data];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      surveyResult: {
        ...updatedData[rowIndex].surveyResult,
        [key]: value,
      },
    };
    setData(updatedData);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateResult({ id: params.id, data: data }));
      toast.success('Result updated successfully!');
    } catch (error) {
      toast.error('Failed to update result. Please try again.');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <table className="custom-table">
        <thead>
          <tr>
            {surveyNameArray.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.elements.map((element: any, index: number) => (
                  <th key={index}>{element.name}</th>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row.surveyResult).map(([key, value]) => (
                <td
                  key={key}
                  contentEditable
                  onBlur={(e) =>
                    handleCellEdit(rowIndex, key, e.target.innerText)
                  }
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="position-end">
        <button className="sjs-button sjs-add-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditResult;
