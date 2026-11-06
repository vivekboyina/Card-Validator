def clean_number(raw):
    """Remove spaces and dashes: '4111 1111' -> '41111111'."""
    return raw.replace(" ", "").replace("-", "")


def is_luhn_valid(number):
    """Return True if the digit string passes the Luhn check."""
    # Only plain digits 0-9 are allowed.
    if not (number.isascii() and number.isdigit()):
        return False

    total = 0
    # Walk from the RIGHT side. position 0 is the last digit.
    for position, char in enumerate(reversed(number)):
        digit = int(char)
        if position % 2 == 1:      # every 2nd digit from the right
            digit = digit * 2
            if digit > 9:
                digit = digit - 9  # same as adding the two digits
        total += digit

    return total % 10 == 0