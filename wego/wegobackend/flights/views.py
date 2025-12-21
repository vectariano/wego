# flights/views.py
import requests
import os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

class FlightsViewSet(ViewSet):
    def list(self, request):
        # Убраны пробелы в URL!
        url = "https://serpapi.com/search.json"
        params = {
            "engine": "google_flights",
            "departure_id": "PEK",
            "arrival_id": "AUS",
            "outbound_date": "2025-12-27",
            "return_date": "2025-12-28",
            "currency": "USD",
            "hl": "en",
            "api_key": os.getenv("SERP_API_KEY")
        }

        # Проверка наличия API-ключа
        if not params["api_key"]:
            error_msg = "SERP_API_KEY is not set in environment"
            print(error_msg)
            return Response({"error": error_msg}, status=500)

        try:
            # Увеличен таймаут до 15 секунд
            response = requests.get(url, params=params, timeout=15)
            response.raise_for_status()
            data = response.json()

            # Возвращаем весь ответ, чтобы фронтенд мог использовать best_flights + other_flights
            return Response(data)

        except requests.exceptions.Timeout:
            error_msg = "SerpAPI request timed out"
            print(error_msg)
            return Response({"error": error_msg}, status=504)
        except requests.exceptions.RequestException as e:
            error_msg = f"SerpAPI connection error: {e}"
            print(error_msg)
            return Response({"error": error_msg}, status=502)
        except Exception as e:
            error_msg = f"Unexpected error: {e}"
            print(error_msg)
            return Response({"error": error_msg}, status=500)
    