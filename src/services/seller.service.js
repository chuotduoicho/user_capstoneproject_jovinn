import axios from "axios";
import authHeader from "./auth-header";
// const API_URL = API_PATH + "/api/v1";
const API_URL = process.env.REACT_APP_API_URL + "/api/v1";
const getTopSellers = () => {
  return axios.get(API_URL + "/seller/sellers").then((response) => {
    // localStorage.setItem("topSeller", JSON.stringify(response.data));
    return response.data;
  });
};
const updateDescriptionBio = ({ descriptionBio, brandName }) => {
  console.log({ descriptionBio });
  return axios.put(
    API_URL + "/seller/profile",

    {
      descriptionBio,
      brandName,
    },
    { headers: authHeader() }
  );
};
const updateSkill = (obj) => {
  console.log(obj);
  const id = obj.id;
  const skills = obj.skills;
  return axios.put(
    API_URL + "/seller-details/skill/" + id,
    {
      skills,
    },
    { headers: authHeader() }
  );
};
const updateEducation = (obj) => {
  console.log(obj);
  const id = obj.eduid;
  const edus = obj.edus;
  return axios.put(API_URL + "/seller-details/education/" + id, edus, {
    headers: authHeader(),
  });
};
const updateCertificate = (obj) => {
  console.log(obj);
  const id = obj.cerid;
  const cers = obj.cers;
  return axios.put(API_URL + "/seller-details/certificate/" + id, cers, {
    headers: authHeader(),
  });
};
const addSkills = (skills) => {
  console.log(skills);
  return axios
    .post(
      API_URL + "/seller-details/skill",

      skills,
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};
const addCertificates = (cers) => {
  console.log(cers);
  return axios.post(
    API_URL + "/seller-details/certificate",

    cers,
    { headers: authHeader() }
  );
};
const addEdus = (edus) => {
  console.log(edus);
  return axios.post(API_URL + "/seller-details/education", edus, {
    headers: authHeader(),
  });
};
const deleteSkill = (id) => {
  console.log(id);
  return axios.delete(API_URL + "/seller-details/skill/" + id, {
    headers: authHeader(),
  });
};
const deleteCer = (id) => {
  console.log(id);
  return axios.delete(API_URL + "/seller-details/certificate/" + id, {
    headers: authHeader(),
  });
};
const deleteEdu = (id) => {
  console.log(id);
  return axios.delete(API_URL + "/seller-details/education/" + id, {
    headers: authHeader(),
  });
};
const sellerService = {
  updateDescriptionBio,
  updateSkill,
  updateCertificate,
  updateEducation,
  addSkills,
  addCertificates,
  addEdus,
  deleteSkill,
  deleteCer,
  deleteEdu,
  getTopSellers,
};

export default sellerService;
