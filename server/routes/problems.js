const express = require("express");
const { body, header } = require("express-validator");
const { validate } = require("../services/validator");
const { verify } = require("../middlewares/verify");
const {
  problemsolved,
  getsolvedproblems,
  isproblemsolved,
  removeproblemsolved,
  suggestproblem,
  getsuggestedproblems,
} = require("../controllers/problems");

const router = express.Router();

router.post(
  "/solved",
  [
    header("Authorization", "Authorization token is required").exists(),
    body("url", "Problem URL is required").exists().isURL(),
  ],
  validate,
  verify,
  problemsolved
);

router.get(
  "/solved",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getsolvedproblems
);

router.get(
  "/solved",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  isproblemsolved
);

router.delete(
  "/solved",
  [
    header("Authorization", "Authorization token is required").exists(),
    body("url", "Problem URL is required").exists().isURL(),
  ],
  validate,
  verify,
  removeproblemsolved
);

router.post(
  "/suggest",
  [
    header("Authorization", "Authorization token is required").exists(),
    body("url", "Problem URL is required").exists().isURL(),
  ],
  validate,
  verify,
  suggestproblem
);

router.get(
  "/suggested",
  [header("Authorization", "Authorization token is required").exists()],
  validate,
  verify,
  getsuggestedproblems
);

module.exports = router;
