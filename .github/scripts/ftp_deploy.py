import ftplib
import os
import sys
from pathlib import Path

host = os.environ["FTP_HOST"]
user = os.environ["FTP_USER"]
password = os.environ["FTP_PASS"]
local_dir = Path("frontend/dist")
remote_dir = "/public_html"

def upload_dir(ftp, local_path, remote_path):
    for item in local_path.iterdir():
        remote_item = f"{remote_path}/{item.name}"
        if item.is_dir():
            try:
                ftp.mkd(remote_item)
            except ftplib.error_perm:
                pass
            upload_dir(ftp, item, remote_item)
        else:
            with open(item, "rb") as f:
                ftp.storbinary(f"STOR {remote_item}", f)
                print(f"Uploaded: {remote_item}")

print(f"Connecting to {host}...")
ftp = ftplib.FTP()
ftp.connect(host, 21, timeout=30)
ftp.set_pasv(True)
print(ftp.login(user, password))
print("Logged in successfully!")

upload_dir(ftp, local_dir, remote_dir)
ftp.quit()
print("Deploy complete!")
