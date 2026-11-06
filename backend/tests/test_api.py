from app import app

client = app.test_client()  # a fake browser for testing


def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.get_json() == {"status": "ok"}


def test_valid_card():
    res = client.post("/api/validate", json={"card_number": "4111 1111 1111 1111"})
    body = res.get_json()
    assert res.status_code == 200
    assert body["valid"] is True
    assert body["card_type"] == "Visa"
    assert body["masked"] == "************1111"


def test_invalid_card_is_still_200():
    res = client.post("/api/validate", json={"card_number": "4111111111111112"})
    assert res.status_code == 200
    assert res.get_json()["valid"] is False


def test_missing_field_gives_400():
    res = client.post("/api/validate", json={"wrong_key": "123"})
    assert res.status_code == 400


def test_no_json_gives_400():
    res = client.post("/api/validate")
    assert res.status_code == 400