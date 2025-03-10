import axios from 'axios';
import { backend } from "./utils/backend.ts";

axios.defaults.baseURL = backend;