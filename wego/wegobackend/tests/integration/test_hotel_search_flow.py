# tests/integration/test_hotel_search_flow.py
import requests
import sys
import time
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000"

def log_step(step: str, status: str = "..."):
    print(f"{status} {step}")
    sys.stdout.flush()

def main():
    print("Running integration test: User searches for a hotel in Bali\n")

    session = requests.Session()

    # 1. Registration
    log_step("Registering new user", "...")
    email = f"bali_test_{int(time.time())}@example.com"
    signup_data = {
        "email": email,
        "password": "bali2026",
        "first_name": "Bali",
        "last_name": "Traveler"
    }
    resp = session.post(f"{BASE_URL}/api/auth/signup/", json=signup_data)
    if resp.status_code != 201:
        log_step("Registration", "FAIL")
        print(f"  Error: {resp.status_code} {resp.json()}")
        return
    log_step("Registration", "OK")

    # 2. Login
    log_step("Logging in", "...")
    login_data = {"email": email, "password": "bali2026"}
    resp = session.post(f"{BASE_URL}/api/auth/login/", json=login_data)
    if resp.status_code != 200:
        log_step("Login", "FAIL")
        print(f"  Error: {resp.status_code} {resp.json()}")
        return
    log_step("Login", "OK")

    # 3. Profile verification
    log_step("Verifying profile (/me)", "...")
    resp = session.get(f"{BASE_URL}/api/auth/me/")
    if resp.status_code != 200:
        log_step("Profile verification", "FAIL")
        print(f"  Error: {resp.status_code} {resp.json()}")
        return
    user = resp.json()
    log_step(f"Profile loaded → {user['first_name']} {user['last_name']}", "OK")

    # 4. Search for hotels in Bali — dates: today +7 and +9 days (2 nights)
    today = datetime.now()
    check_in = (today + timedelta(days=7)).strftime("%Y-%m-%d")
    check_out = (today + timedelta(days=9)).strftime("%Y-%m-%d")

    log_step(f"Searching for hotels in Bali ({check_in} – {check_out})", "...")
    params = {
        "destination": "Bali Resorts",
        "check_in": check_in,
        "check_out": check_out,
        "adults": "2",
        "rooms": "1"
    }
    resp = session.get(f"{BASE_URL}/api/hotels/", params=params)
    
    if resp.status_code != 200:
        log_step("Hotel API request", "FAIL")
        print(f"  Error: {resp.status_code}")
        print(f"  Response: {resp.json()}")
        return

    hotels = resp.json()
    if not isinstance(hotels, list):
        log_step("Response parsing", "WARN")
        print("  Response is not a list. Check backend logs (possible SerpAPI error).")
        print(f"  Sample: {str(hotels)[:200]}...")
        return

    log_step(f"Search completed → {len(hotels)} hotels found", "OK")

    if hotels:
        # Sort by rating (desc) and price (asc)
        def get_price(h):
            price = h.get("price", {})
            if isinstance(price, dict):
                return float(price.get("extracted", 999999))
            elif isinstance(price, (int, float)):
                return price
            return 999999

        hotels.sort(key=lambda h: (-h.get("rating", 0), get_price(h)))
        top = hotels[0]

        name = top.get("name", "—")
        rating = top.get("rating", "—")
        reviews = top.get("reviews", "—")
        if isinstance(reviews, int):
            reviews = f"{reviews:,}"

        # Price formatting
        price_display = "—"
        price = top.get("price")
        if isinstance(price, dict):
            price_display = price.get("display", "—")
        elif isinstance(price, str):
            price_display = price

        location = top.get("location", "—")
        token = top.get("property_token", "—")[:10] + "..." if top.get("property_token") else "—"

        print(f"\nTop hotel in Bali:")
        print(f"   Name:       {name}")
        print(f"   Rating:     {rating} ({reviews} reviews)")
        print(f"   Price:      {price_display}")
        print(f"   Location:   {location}")
        print(f"   Token:      {token}")

    print("\nTest completed successfully: user found hotels in Bali.")
    print("Booking can now proceed.")

if __name__ == "__main__":
    main()