"""
URL configuration for wegobackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from hotels.views import HotelViewSet
from rest_framework.routers import DefaultRouter
from django.views.static import serve
from django.urls import re_path
from django.conf import settings

router = DefaultRouter()
router.register(r'hotels', HotelViewSet, basename="hotel")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name="home"),
    path("api/auth/", include("accounts.urls")),
    path("api/", include(router.urls)),

    re_path(r'^manifest\.json$', serve, {
        'document_root': settings.BASE_DIR / "wego" / "build",
        'path': "manifest.json"
    }),
]
