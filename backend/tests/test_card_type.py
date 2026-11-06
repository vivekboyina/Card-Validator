from card_type import get_card_type


def test_visa():
    assert get_card_type("4111111111111111") == "Visa"


def test_mastercard_51_to_55():
    assert get_card_type("5555555555554444") == "Mastercard"


def test_mastercard_2_series():
    assert get_card_type("2223000048400011") == "Mastercard"


def test_unknown_prefix():
    assert get_card_type("9999999999999999") == "Unknown"


def test_visa_wrong_length():
    assert get_card_type("41111") == "Unknown"


def test_letters_and_empty():
    assert get_card_type("4111abcd") == "Unknown"
    assert get_card_type("") == "Unknown"