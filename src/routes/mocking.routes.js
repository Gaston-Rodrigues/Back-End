import { Router } from "express";
import {getProductMock } from "../controllers/mocking.controller.js";


const mockingRoutes = Router();


mockingRoutes.get("/", getProductMock)


export default mockingRoutes;