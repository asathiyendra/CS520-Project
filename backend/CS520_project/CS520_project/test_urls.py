from django.test import TestCase, Client
from django.urls import reverse
from prompts.models import Prompt

class PromptViewSetTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.prompt = Prompt.objects.create(title="Test Prompt", content="This is a test prompt.")

    def test_list_prompt(self):
        url = reverse("prompt-list", kwargs={"id": self.prompt.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "Test Prompt")
        self.assertEqual(response.data["content"], "This is a test prompt.")