import os
import shutil

def move_public_back_to_parent():
    root_dir = os.getcwd()

    for folder in os.listdir(root_dir):
        folder_path = os.path.join(root_dir, folder)

        # Skip if not a directory
        if not os.path.isdir(folder_path):
            continue

        public_path = os.path.join(folder_path, "public")
        if not os.path.exists(public_path):
            continue

        for item in os.listdir(public_path):
            item_path = os.path.join(public_path, item)
            dest_path = os.path.join(folder_path, item)

            # Move the item back to parent folder
            shutil.move(item_path, dest_path)
            print(f"Moved: {item_path} → {dest_path}")

        # Remove the empty 'public' folder
        os.rmdir(public_path)
        print(f"Removed empty folder: {public_path}")

    print("✅ All contents moved back from 'public/' to parent folders.")

if __name__ == "__main__":
    move_public_back_to_parent()
