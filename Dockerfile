FROM python:3.9-slim

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "python", "backend/services/app.py" ]