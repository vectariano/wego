from django.shortcuts import render

# Create your views here.

import requests
import os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

class FlightsViewSet(ViewSet):
    def list(self, request):
        url = "https://serpapi.com/search.json"  
        params = {
            "engine": "google_flights",
            "departure_id": "PEK",
            "arrival_id": "AUS",
            "outbound_date": "2025-11-16",
            "return_date": "2025-11-20",
            "currency": "USD",
            "hl": "en",
            "api_key": os.getenv("SERP_API_KEY")
        }

        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            flights =  data.get("other_flights")  or []
            print(data)

            return Response(flights)
        except Exception as e:
            error_msg = f" SerpAPI error: {e}"
            print(error_msg)
            return Response({"error": error_msg}, status=500)

    