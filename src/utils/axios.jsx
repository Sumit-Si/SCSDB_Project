import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDAyMDNlZTZmOTJjNmYzMjQxM2JhZTdjMjA5YjhkYiIsIm5iZiI6MTczMzczMDE1NS4yNzAwMDAyLCJzdWIiOiI2NzU2OWY2YmVlMzNiMTA5N2FjMDhjYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xBmCMCQpqkoLBalVahcje7N0PtEg0L0IfvxYUw97yd0",
  },
});

export default instance;
