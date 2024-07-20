import React, { useEffect, useMemo } from "react";
import { useReduxDispatch } from "../redux";
import { get, update } from "../redux/surveys";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/survey-creator-core.css";

const Editor = (params: { id: string }): React.ReactElement => {
  const dispatch = useReduxDispatch();
  const creator = useMemo(() => {
    const options = {
      showLogicTab: true,
      showThemeTab: true,
      showTranslationTab: true,
    };
    return new SurveyCreator(options);
  }, []);
  creator.isAutoSave = true;
  creator.saveSurveyFunc = (
    saveNo: number,
    callback: (no: number, success: boolean) => void
  ) => {
    // This is a workaround and might not be the correct solution
    dispatch(update({ id: params.id, content: creator.JSON }));
    callback(saveNo, true);
  };

  useEffect(() => {
    (async () => {
      const surveyAction = await dispatch(get(params.id));
      creator.JSON = JSON.parse(surveyAction.payload.content);
    })();
  }, [dispatch, creator, params.id]);

  return (
    <>
      <SurveyCreatorComponent creator={creator} />
    </>
  );
};

export default Editor;
