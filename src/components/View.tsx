import React, { useEffect, useRef } from "react";
import { useReduxDispatch } from "../redux";
import { load_one } from "../redux/results";
import { get } from "../redux/surveys";
import { Model } from "survey-core";
import "tabulator-tables/dist/css/tabulator.css";
import "survey-analytics/survey.analytics.tabulator.css";
import Loading from "../components/Loading";
const SurveyAnalyticsTabulator = require("survey-analytics/survey.analytics.tabulator");

// View component that displays survey analytics.
//
// @param {Object} params - Component parameters.
// @param {string} params.id - Survey ID.
//
// @returns {React.ReactElement} - The rendered view component.
const View = (params: { id: string }): React.ReactElement => {
  // Reference to the container element for the analytics visualization.
  const visContainerRef = useRef<HTMLDivElement>(null);

  // Redux dispatch function.
  const dispatch = useReduxDispatch();

  // Flag indicating whether the data is still loading.
  const [loading, setLoading] = React.useState(true);

  // Fetches survey data and renders the analytics visualization.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetches the survey data from the Redux store.
        const surveyAction = await dispatch(get(params.id));
        const survey = surveyAction?.payload;

        // Fetches the survey results data from the Redux store.
        const resultsAction = await dispatch(load_one(params.id));
        const data = resultsAction?.payload;
        if (data) {
          if (data.length > 0 && visContainerRef.current) {
            // Creates a new SurveyCore model instance.
            var model = new Model(survey.content);

            // Clears the container element.
            visContainerRef.current.innerHTML = "";

            // Creates a new SurveyAnalyticsTabulator instance.
            var surveyAnalyticsTabulator =
              new SurveyAnalyticsTabulator.Tabulator(
                model,
                data.map((item: any) =>
                  typeof item.surveyResult === "string"
                    ? JSON.parse(item.surveyResult)
                    : item.surveyResult
                )
              );

            // Renders the analytics visualization.
            surveyAnalyticsTabulator.render(visContainerRef.current);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        // Sets the loading flag to false.
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, params.id, loading]);

  return (
    <>
      {loading ? (
        // Displays a loading indicator while the data is loading.
        <Loading />
      ) : (
        <div className="sjs-results-content" ref={visContainerRef}>
          <div className="sjs-results-placeholder">
            <span>This survey doesn't have any answers yet</span>
          </div>
        </div>
      )}
    </>
  );
};

export default View;
