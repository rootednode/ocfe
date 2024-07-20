import { useParams } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { useReduxDispatch } from "../redux";
import { post } from "../redux/results";
import { get, ISurveyDefinition } from "../redux/surveys";
import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import Loading from "../components/Loading";

// Apply theme dynamically based on a config or user preference
const theme = "defaultV2";
StylesManager.applyTheme(theme);

const Run = () => {
  // Rename dispatch to reduxDispatch for clarity
  const reduxDispatch = useReduxDispatch();
  const { id } = useParams();
  const [survey, setSurvey] = useState<ISurveyDefinition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Create a callback function to handle the survey completion
  const handleSurveyComplete = useCallback(
    (sender: Model) => {
      reduxDispatch(
        post({
          postId: id as string,
          surveyResult: sender.data,
          surveyResultText: JSON.stringify(sender.data),
        })
      );
    },
    [reduxDispatch, id]
  );

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        setLoading(true);
        const surveyAction = await reduxDispatch(get(id as string));
        const data = surveyAction.payload;
        const content = JSON.parse(data.content);
        setSurvey(content);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [reduxDispatch, id]);

  // Create the Model instance only when the survey is available
  const model = survey ? new Model(survey) : null;

  // Add the event listener only when the model is created
  if (model) {
    model.onComplete.add(handleSurveyComplete);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {survey ? (
            <div>
              <h1>{survey.title}</h1>
              <p style={{ paddingLeft: "1.5rem" }}>{survey.description}</p>
            </div>
          ) : (
            <p>{error ? `Error: ${error}` : "Not configured"}</p>
          )}
          {model && <Survey model={model} />}
        </>
      )}
    </>
  );
};

export default Run;
