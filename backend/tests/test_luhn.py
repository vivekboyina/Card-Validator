from luhn import clean_number, is_luhn_valid


def test_valid_test_card():
    assert is_luhn_valid("4111111111111111") is True


def test_wrong_last_digit():
    assert is_luhn_valid("4111111111111112") is False


def test_letters_rejected():
    assert is_luhn_valid("4111abcd11111111") is False


def test_empty_string():
    assert is_luhn_valid("") is False


def test_clean_number():
    assert clean_number("4111 1111-1111 1111") == "4111111111111111"