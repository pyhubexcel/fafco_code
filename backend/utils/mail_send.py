from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator


def send_verification_email(user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verification_url = f"http://{settings.BACKEND_IP}/api/auth/verify/{uid}/{token}/"
    click_here_link = f'<a href="{verification_url}">click here</a>'
    send_mail(
        "Verify Your Email",
        f"Click the link to verify your email: {click_here_link}",
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
        html_message=f"Click the link to verify your email: {click_here_link}",
    )
