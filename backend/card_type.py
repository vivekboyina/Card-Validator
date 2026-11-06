def get_card_type(number):
    """Return 'Visa', 'Mastercard' or 'Unknown' using prefix and length."""
    # Only plain digits are allowed.
    if not (number.isascii() and number.isdigit()):
        return "Unknown"

    length = len(number)

    # Visa: starts with 4, and has 13, 16 or 19 digits.
    if number.startswith("4") and length in (13, 16, 19):
        return "Visa"

    # Mastercard: 16 digits, starts with 51-55 or 2221-2720.
    if length == 16:
        first_two = int(number[:2])
        first_four = int(number[:4])
        if 51 <= first_two <= 55 or 2221 <= first_four <= 2720:
            return "Mastercard"

    return "Unknown"