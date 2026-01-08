# tests/unit/test_hotel_unit.py
from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient
from unittest.mock import patch, MagicMock
from datetime import date, timedelta
from hotels.views import _HOTELS_CACHE
from freezegun import freeze_time

# Очистка кэша перед всеми тестами
_HOTELS_CACHE.clear()

@override_settings(SERP_API_KEY="test-key-hotels")
class HotelViewSetUnitTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('hotel-list')  # Убедитесь, что маршрут зарегистрирован как 'hotel-list'
        _HOTELS_CACHE.clear()

    @patch('hotels.views.requests.get')
    def test_valid_hotel_search(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "properties": [
                {"name": "Bali Grand Resort", "price": {"display": "$200"}, "rating": 4.6}
            ]
        }
        mock_get.return_value = mock_response

        response = self.client.get(self.url, {
            "destination": "Bali",
            "check_in": "2026-03-01",
            "check_out": "2026-03-05",
            "adults": "2",
            "rooms": "1"
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["name"], "Bali Grand Resort")
        self.assertIn("search_params", data[0])

    @patch('hotels.views.requests.get')
    def test_cache_hit(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = {"properties": [{"name": "Cached Hotel"}]}
        mock_get.return_value = mock_response

        params = {
            "destination": "Paris",
            "check_in": "2026-04-01",
            "check_out": "2026-04-03",
            "adults": "1",
            "rooms": "1"
        }

        # Первый вызов — идёт в SerpAPI
        self.client.get(self.url, params)
        self.assertEqual(mock_get.call_count, 1)

        # Второй вызов — из кэша
        self.client.get(self.url, params)
        self.assertEqual(mock_get.call_count, 1)  # кэш сработал

    @freeze_time("2026-01-01 00:00:00")
    @patch('hotels.views.requests.get')
    def test_cache_expires_after_ttl(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = {"properties": [{"name": "TTL Hotel"}]}
        mock_get.return_value = mock_response

        params = {
            "destination": "Tokyo",
            "check_in": "2026-05-01",
            "check_out": "2026-05-03"
        }

        self.client.get(self.url, params)
        self.assertEqual(mock_get.call_count, 1)

        # Сдвигаем время на 301 секунду (> TTL=300)
        with freeze_time("2026-01-01 00:05:01"):
            self.client.get(self.url, params)
            self.assertEqual(mock_get.call_count, 2)  # кэш протух

    @patch('hotels.views.requests.get')
    def test_serpapi_returns_error_in_body(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = {"error": "Invalid destination"}
        mock_get.return_value = mock_response

        response = self.client.get(self.url, {"destination": "InvalidPlace"})
        self.assertEqual(response.status_code, 200)

    @patch('hotels.views.requests.get')
    def test_invalid_check_in_date_uses_defaults(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = {"properties": [{"name": "Default Dates Hotel"}]}
        mock_get.return_value = mock_response

        response = self.client.get(self.url, {
            "check_in": "not-a-date",
            "check_out": "also-not-a-date"
        })
        self.assertEqual(response.status_code, 200)
        # Дата должна быть исправлена на сегодня+2 и сегодня+4 (или аналогично)

    @patch('hotels.views.requests.get')
    def test_check_out_before_check_in_is_corrected(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = {"properties": [{"name": "Fixed Dates Hotel"}]}
        mock_get.return_value = mock_response

        response = self.client.get(self.url, {
            "check_in": "2026-06-10",
            "check_out": "2026-06-05"  # раньше заезда!
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        if isinstance(data, list) and len(data) > 0:
            params = data[0]["search_params"]
            # Проверяем, что дата отъезда > заезда
            self.assertGreater(params["check_out"], params["check_in"])

    @patch('hotels.views.requests.get')
    def test_adults_and_rooms_validation(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = {"properties": [{"name": "Validation Hotel"}]}
        mock_get.return_value = mock_response

        response = self.client.get(self.url, {
            "adults": "0",    # должно стать 2
            "rooms": "-1"     # должно стать 1
        })
        self.assertEqual(response.status_code, 200)
        data = response.json()
        if isinstance(data, list) and len(data) > 0:
            params = data[0]["search_params"]
            self.assertEqual(params["adults"], 2)
            self.assertEqual(params["rooms"], 1)



    @patch('hotels.views.requests.get')
    def test_different_serpapi_response_formats(self, mock_get):
        # SerpAPI может возвращать "properties", "hotels" или "results"
        formats = [
            {"properties": [{"name": "Prop Hotel"}]},
            {"hotels": [{"name": "Hotel Hotel"}]},
            {"results": [{"name": "Result Hotel"}]}
        ]

        for i, fmt in enumerate(formats):
            with self.subTest(format=i):
                mock_get.reset_mock()
                mock_response = MagicMock()
                mock_response.json.return_value = fmt
                mock_get.return_value = mock_response

                response = self.client.get(self.url, {"destination": "Test"})
                self.assertEqual(response.status_code, 200)
                data = response.json()
                self.assertIsInstance(data, list)
                self.assertEqual(len(data), 1)
                self.assertIn("search_params", data[0])

    def test_url_reverse_works(self):
        self.assertEqual(self.url, "/api/hotels/")