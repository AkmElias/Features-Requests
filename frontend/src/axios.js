import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

