FROM python:3.9.5

RUN pip install --upgrade pip
COPY ./ ./
RUN pip install -r requirements.txt
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh
RUN pip install gunicorn