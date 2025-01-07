export { removeTv } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadTv } from "../reducers/tvSlice";

export const asyncLoadTv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

    let ultimateDetails = {
        detail: detail.data,
        externalId: externalId.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        translations: translations.data.translations,
        videos: videos.data.results.find(v => v.type === "Trailer"),
        watchProviders: watchProviders.data.results.IN,
    }

    // console.log(ultimateDetails);
    dispatch(loadTv(ultimateDetails));

  } catch (err) {
    console.log(err);
  }
};
