# Build the project
echo "Building the project..."
python3.9 -m pip install -r requirements.txt

# Run the project
echo "Running the project..."
echo "<------------------->"
echo "Make Migration..."
python3.9 manage.py makemigrations --noinput
echo "Migrate..."
python3.9 manage.py migrate --noinput

echo "Collect Static..."
python3.9 manage.py collectstatic --noinput --clear

echo "Run tests..."
python3.9 manage.py test Genetic.tests.MainTestCase.MainCase