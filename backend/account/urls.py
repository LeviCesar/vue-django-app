from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserReadViewSet, basename='user-read')
router.register(r'register', views.UserCreateViewSet, basename='user-create')

urlpatterns = router.urls
