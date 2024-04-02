from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, AbstractUser
)


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, role=None, aid=None, email=None):
        if username and role and aid:
            user = self.model(
                username=username,
                role=role,
                aid=aid,
                email=email
            )
        user.set_password(password)
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    aid = models.IntegerField()
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    role = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['']

    objects = CustomUserManager()

    @property
    def is_authenticated(self):
        return True


    class Meta:
        db_table = 'login'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
