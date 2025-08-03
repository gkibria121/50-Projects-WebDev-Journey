import os
import shutil

def move_contents_into_public():
    root_dir = os.getcwd()

    for folder in os.listdir(root_dir):
        folder_path = os.path.join(root_dir, folder)
        if folder is '.git':
            continue
        # Skip if not a directory or already a 'public' folder
        if not os.path.isdir(folder_path) or folder == "public":
            continue

        public_path = os.path.join(folder_path, "public")
        os.makedirs(public_path, exist_ok=True)

        for item in os.listdir(folder_path):
            item_path = os.path.join(folder_path, item)

            # Skip the newly created 'public' folder to avoid moving into itself
            if item == "public":
                continue

            dest_path = os.path.join(public_path, item)
            shutil.move(item_path, dest_path)
            print(f"Moved: {item_path} → {dest_path}")

    print("✅ All contents moved into 'public/' subfolders.")

if __name__ == "__main__":
    move_contents_into_public()
