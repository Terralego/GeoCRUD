import base64


def str2bool(v, values=("yes", "true", "t", "1")):
    """ Check if an arg seems to be a positive or negative value """
    return str(v).lower() in values


def get_b64_content(file_path):
    with open(file_path, 'rb+') as current_file:
        return base64.b64encode(current_file.read()).decode()
