import os
import shutil

def move_folders_to_public():
    base_dir = os.getcwd()
    public_dir = os.path.join(base_dir, 'public')

    os.makedirs(public_dir, exist_ok=True)

    for item in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item)

        if item == 'public' or not os.path.isdir(item_path):
            continue

        target_path = os.path.join(public_dir, item)

        # Move the entire folder into public/
        shutil.move(item_path, target_path)
        print(f"Moved: {item} → public/{item}")

    print("✅ All folders moved into 'public/'")

if __name__ == "__main__":
    move_folders_to_public()
