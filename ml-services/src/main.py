from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from typing import Dict, Any

# Import ML modules
from .models.credit_scoring import CreditScoringModel
from .models.risk_assessment import RiskAssessmentModel
from .models.fraud_detection import FraudDetectionModel

app = FastAPI(
    title="Fin-Agentix India ML Services",
    description="AI-powered lending decision engine for Indian financial market",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
credit_model = CreditScoringModel()
risk_model = RiskAssessmentModel()
fraud_model = FraudDetectionModel()

class LoanRequest(BaseModel):
    user_data: Dict[str, Any]
    financial_data: Dict[str, Any]
    loan_details: Dict[str, Any]

@app.post("/api/v1/predict/credit-score")
async def predict_credit_score(request: LoanRequest):
    try:
        score = credit_model.predict(request.dict())
        return {"credit_score": score, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/assess/risk")
async def assess_risk(request: LoanRequest):
    try:
        risk_score = risk_model.assess(request.dict())
        return {"risk_score": risk_score, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
