import axios from "axios";
import dateFormat from "dateformat";
import { Buffer } from "buffer";

// The application requests authorization
const ClientId = process.env.REACT_APP_CLIENT_ID; // client id
const ClientSecret = process.env.REACT_APP_CLIENT_SECRET; // secret

const Auth = async () => {
  let data = { grant_type: "client_credentials" };
  return await axios.post("https://accounts.spotify.com/api/token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + new Buffer(ClientId + ":" + ClientSecret).toString("base64"),
    },
    json: true,
  });
};

const endPoint = "https://api.spotify.com/v1/";

let token = "";

export const formatD = (date) => {
  return dateFormat(date, "dd/mm/yyyy hh:mm:ss");
};

export const get = async (url, data = null) => {
  try {
    let result = await Auth();
    token = result.data.access_token;
    return await axios.get(endPoint + url, {
      params: data,
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    return false;
  }
};

export const post = async (url, data) => {
  try {
    let result = await Auth();
    token = result.data.access_token;
    return await axios.post(endPoint + url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${token}`,
      },
    });
  } catch (error) {
    return false;
  }
};
