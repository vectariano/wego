# flights/views.py
import requests
import os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

class FlightsViewSet(ViewSet):
    def list(self, request):
        # Теперь параметры берутся из query_params запроса (например, /api/flights/?departure_id=PEK&arrival_id=AUS&...)
        # Дефолтные значения для тестирования
        departure_id = request.query_params.get('departure_id', 'PEK').upper()
        arrival_id = request.query_params.get('arrival_id', 'AUS').upper()
        outbound_date = request.query_params.get('outbound_date', '2026-02-15')
        return_date = request.query_params.get('return_date', '2026-02-16')
        currency = request.query_params.get('currency', 'USD')
        hl = request.query_params.get('hl', 'en')

        url = "https://serpapi.com/search.json"
        params = {
            "engine": "google_flights",
            "departure_id": departure_id,
            "arrival_id": arrival_id,
            "outbound_date": outbound_date,
            "return_date": return_date,
            "currency": currency,
            "hl": hl,
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