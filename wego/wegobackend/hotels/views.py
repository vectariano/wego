# hotels/views.py
import requests
import os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv
from urllib.parse import urlencode

load_dotenv()

_HOTELS_CACHE = []

class HotelViewSet(ViewSet):
    def list(self, request):
        print("HotelViewSet.list called")

        adults = request.query_params.get("adults", "2")
        try:
            adults = int(adults)
            if adults < 1:
                adults = 2
        except (TypeError, ValueError):
            adults = 2

        api_key = os.getenv("SERP_API_KEY")

        url = "https://serpapi.com/search.json"
        params = {
            "engine": "google_hotels",
            "q": "Bali Resorts",
            "check_in_date": "2025-12-24",
            "check_out_date": "2025-12-26",
            "adults": str(adults),
            "hotel_class": 3,
            "api_key": api_key
        }

        query_string = urlencode(params)
        full_url = f"{url}?{query_string}"
        print(f">>> Sending request to: {full_url}")

        try:
            response = requests.get(url, params=params, timeout=15)
            response.raise_for_status()
            data = response.json()
            hotels = data.get("properties", [])

            global _HOTELS_CACHE
            _HOTELS_CACHE = hotels

            print(f"Received {len(hotels)} hotels")
            return Response(hotels)

        except Exception as e:
            error_msg = f"SerpAPI error: {e}"
            print(error_msg)
            return Response({"error": error_msg}, status=500)

    def retrieve(self, request, pk=None):
        print(f"HotelViewSet.retrieve called with pk={repr(pk)}")
        if not pk:
            return Response({"error": "Hotel ID is required"}, status=400)

        global _HOTELS_CACHE
        for hotel in _HOTELS_CACHE:
            if hotel.get("property_token") == pk:
                print(f"Found hotel: {hotel.get('name')}")
                return Response(hotel)

        print(f"Hotel with property_token={pk} not found")
        return Response({"error": "Hotel not found"}, status=404)