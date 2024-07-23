command_exists(){
    command -v "$1" >/dev/null 2>&1
}

install_package(){
    if command_exists apt-get; then
        sudo apt-get update
        sudo apt-get install -y "$1"
    elif command_exists yum; then
        sudo yum install -y "$1"
    elif command_exists brew; then
        brew install "$1"
    else
        echo 'start-backend-server.sh: $1 could not be installed, please install it manually.'
        exit 1
    fi
}

if ! command_exists ollama; then
    echo '@start-backend-server.sh: "ollama" is not installed, it will try to install automatically.'
    if ! command_exists curl; then
        install_package curl
    fi
    curl -fsSL https://ollama.com/install.sh | sh
fi

if ! command_exists python3; then
    echo '@start-backend-server.sh: "python3" is not installed, it will try to install automatically.'
    install_package python3
fi

if ! command_exists pip; then
    echo '@start-backend-server.sh: "pip" is not installed, it will try to install automatically.'
    install_package python3-pip
fi

if ! command_exists virtualenv; then
    echo '@start-backend-server.sh: "python3-virtualenv" is not installed, it will try to install automatically.'
    pip3 install virtualenv
fi

if [ ! -d './venv/' ]; then
    echo '@start-backend-server.sh: creating virtual environment to run python3 dependencies...'
    python3 -m virtualenv venv
fi

echo '@start-backend-server.sh: activating the virtual environment...'
source venv/bin/activate

REQUIREMENTS_FILE='requirements.txt'
TIMESTAMP_FILE='venv/.last_install_timestamp'

# TODO: I think this should be more robust, and check package by package if they are installed.
if [ ! -f "$TIMESTAMP_FILE" ] || [ "$REQUIREMENTS_FILE" -nt "$TIMESTAMP_FILE" ]; then
    echo '@start-backend-server.sh: installing/updating python dependencies...'
    pip install -r "$REQUIREMENTS_FILE"
    touch "$TIMESTAMP_FILE"
else
    echo '@start-backend-server.sh: requirements are up to date, skipping installation.'
fi

cores=$(nproc)
if [ "$cores" -lt 1 ]; then
  cores=1
fi

adjusted_threads=$((cores - 1))

if [ "$adjusted_threads" -lt 1 ]; then
  adjusted_threads=1
fi

echo '@start-backend-server.sh: starting ollama server...'
ollama serve > /dev/null 2>&1

echo '@start-backend-server.sh: starting rembg api server...'
export BROWSER=none
rembg s -p 7000 --host 0.0.0.0 --threads $adjusted_threads -l error > /dev/null 2>&1 &
unset BROWSER

echo '@start-backend-server.sh: starting backend server...'
export TF_CPP_MIN_LOG_LEVEL=2
TF_CPP_MIN_LOG_LEVEL=2 npx tsx server.ts