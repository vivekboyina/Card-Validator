from luhn import clean_number, is_luhn_valid
from card_type import get_card_type


def mask_number(number):
    """Show only the last 4 digits: '4111111111111111' -> '************1111'."""
    if len(number) <= 4:
        return "*" * len(number)
    return "*" * (len(number) - 4) + number[-4:]


def _result(valid, card_type, masked, message):
    """Helper: build the answer dictionary in one place."""
    return {"valid": valid, "card_type": card_type,
            "masked": masked, "message": message}


def validate_card(raw):
    """Check a card number and return a dictionary with the result."""
    number = clean_number(raw)

    if not (number.isascii() and number.isdigit()):
        return _result(False, "Unknown", "", "Use digits, spaces or dashes only.")

    if not 13 <= len(number) <= 19:
        return _result(False, "Unknown", "", "Card number must be 13 to 19 digits.")

    card_type = get_card_type(number)
    masked = mask_number(number)

    if not is_luhn_valid(number):
        return _result(False, card_type, masked, "Number failed the Luhn check.")

    return _result(True, card_type, masked, "Valid card number.")