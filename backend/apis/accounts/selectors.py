import os
from uuid import uuid4


def get_file_path(instance, filename):
    ext = filename.split(".")[-1]
    # get filename
    if instance.username:
        filename = "{}.{}".format(instance.username, ext)
    else:
        # set filename as random string
        filename = "{}.{}".format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join("profile_pics", filename)
