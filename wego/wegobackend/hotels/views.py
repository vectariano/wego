from django.shortcuts import render
import requests, os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

class HotelViewSet(ViewSet):
    def list(self, request):
        url = "https://serpapi.com/search.json"
        params = {
            "engine" : "google_hotels",
            "q" : "Bali Resorts",
            "check_in_date": "2025-11-28",
            "check_out_date": "2025-11-29",
            "hotel_class": 3,
            "api_key": os.getenv("SERP_API_KEY")
        }

        try:
            response = requests.get(url, params=params)
            data = response.json()
            hotels = data.get("properties" , [])

            if hotels: 
                print(hotels[0])
            return Response(hotels)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

