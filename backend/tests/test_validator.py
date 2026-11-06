from validator import validate_card, mask_number


def test_valid_visa():
    result = validate_card("4111111111111111")
    assert result["valid"] is True
    assert result["card_type"] == "Visa"
    assert result["masked"] == "************1111"


def test_valid_mastercard():
    result = validate_card("5555555555554444")
    assert result["valid"] is True
    assert result["card_type"] == "Mastercard"


def test_spaces_and_dashes_allowed():
    assert validate_card("4111 1111-1111 1111")["valid"] is True


def test_fails_luhn():
    result = validate_card("4111111111111112")
    assert result["valid"] is False
    assert result["message"] == "Number failed the Luhn check."


def test_letters_rejected():
    result = validate_card("4111abcd11111111")
    assert result["valid"] is False
    assert result["masked"] == ""


def test_too_short():
    result = validate_card("4111")
    assert result["valid"] is False
    assert result["message"] == "Card number must be 13 to 19 digits."


def test_mask_number():
    assert mask_number("4111111111111111") == "************1111"
    assert mask_number("123") == "***"