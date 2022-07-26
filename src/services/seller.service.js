import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/v1";
const updateDescriptionBio = ({ descriptionBio }) => {
  console.log({ descriptionBio });
  return axios.put(
    API_URL + "/seller/profile",

    {
      descriptionBio,
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
  const id = obj.id;
  const edus = obj.edus;
  return axios.put(
    API_URL + "/seller-details/education/" + id,
    {
      edus,
    },
    { headers: authHeader() }
  );
};
const updateCertificate = (obj) => {
  console.log(obj);
  const id = obj.id;
  const cers = obj.certificates;
  return axios.put(
    API_URL + "/seller-details/certificate/" + id,
    {
      cers,
    },
    { headers: authHeader() }
  );
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
};

export default sellerService;
