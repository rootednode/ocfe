import React, { useEffect, useMemo } from "react";
import { useReduxDispatch } from "../redux";
import { get, getraw, update } from "../redux/surveys";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/survey-creator-core.css";

const Editor = (params: { id: string }): React.ReactElement => {
  const dispatch = useReduxDispatch();
  const creator = useMemo(() => {
    const options = {
			allowHtml: true,
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
		console.log('save');
    callback(saveNo, true);
  };

  useEffect(() => {
    (async () => {
      const surveyAction = await dispatch(getraw(params.id));
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
