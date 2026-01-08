# tests/unit/test_auth_unit.py
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
import json

class AuthViewUnitTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.me_url = reverse('me')

    def test_signup_success(self):
        """Успешная регистрация нового пользователя"""
        data = {
            "email": "test@example.com",
            "password": "securePass123!",
            "first_name": "Test",
            "last_name": "User"
        }
        response = self.client.post(self.signup_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.get(email="test@example.com")
        self.assertEqual(user.username, "test@example.com")
        self.assertEqual(user.first_name, "Test")

    def test_signup_missing_email_or_password(self):
        """Ошибка при отсутствии email или пароля"""
        response = self.client.post(self.signup_url, {
            "email": "test@example.com"
            # password отсутствует
        }, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn("required", response.json()["error"])

        response = self.client.post(self.signup_url, {
            "password": "123"
            # email отсутствует
        }, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signup_duplicate_email(self):
        """Ошибка при попытке регистрации с существующим email"""
        # Регистрируем первого пользователя
        User.objects.create_user(
            username="existing@example.com",
            email="existing@example.com",
            password="pass123"
        )

        # Пытаемся зарегистрировать второго с тем же email
        data = {
            "email": "existing@example.com",
            "password": "newPass456!",
            "first_name": "Duplicate",
            "last_name": "User"
        }
        response = self.client.post(self.signup_url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertIn("already exists", response.json()["error"])
        self.assertEqual(User.objects.count(), 1)  # Новых пользователей не добавлено

    def test_login_success(self):
        """Успешный вход"""
        # Создаём пользователя
        User.objects.create_user(
            username="login@test.com",
            email="login@test.com",
            password="loginPass123!"
        )

        response = self.client.post(self.login_url, {
            "email": "login@test.com",
            "password": "loginPass123!"
        }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn("Login successful", response.json()["message"])

        # Проверяем, что пользователь вошёл
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["email"], "login@test.com")

    def test_login_invalid_credentials(self):
        """Ошибка при неверном пароле или email"""
        User.objects.create_user(
            username="valid@test.com",
            email="valid@test.com",
            password="correctPass123!"
        )

        # Неверный пароль
        response = self.client.post(self.login_url, {
            "email": "valid@test.com",
            "password": "wrongPass"
        }, content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertIn("Invalid credentials", response.json()["error"])

        # Несуществующий email
        response = self.client.post(self.login_url, {
            "email": "notexist@test.com",
            "password": "anyPass"
        }, content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_me_requires_authentication(self):
        """/me возвращает 401 без аутентификации"""
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, 401)

    def test_logout_success(self):
        """Успешный выход"""
        user = User.objects.create_user(
            username="logout@test.com",
            email="logout@test.com",
            password="logoutPass123!"
        )

        # Входим
        self.client.login(username="logout@test.com", password="logoutPass123!")

        # Проверяем, что вошли
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, 200)

        # Выходим
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("Logged out", response.json()["message"])

        # После выхода /me должен вернуть 401
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, 401)

    def test_login_then_logout_then_login_again(self):
        """Полный цикл: вход → выход → повторный вход"""
        email = "cycle@test.com"
        password = "cyclePass123!"
        User.objects.create_user(username=email, email=email, password=password)

        # Вход
        self.client.post(self.login_url, {"email": email, "password": password}, content_type='application/json')
        self.assertEqual(self.client.get(self.me_url).status_code, 200)

        # Выход
        self.client.post(self.logout_url)
        self.assertEqual(self.client.get(self.me_url).status_code, 401)

        # Повторный вход
        self.client.post(self.login_url, {"email": email, "password": password}, content_type='application/json')
        self.assertEqual(self.client.get(self.me_url).status_code, 200)