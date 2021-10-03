from flask import Flask, render_template, redirect, url_for, request, jsonify
from app import app
import json
import os

JSON_FILE_PATH = os.path.join(app.static_folder, 'data', "companies.json")

@app.route('/')
def index():
    companies_data = get_data_from_json()
    for a_dict in companies_data:
        a_dict.update({"years":list(a_dict.get("years_data",{}).keys())})
        a_dict.pop("years_data")
    return render_template("index.html",companies_data=companies_data)


@app.route('/getCompanyDetails', methods=['GET',])
def get_company_details():


    if request.method == 'GET':
        tick = request.args.get('tick')
        year = request.args.get('year',"")
        companies_data = get_data_from_json()
        company = list(filter(lambda x: x.get('tick') == tick, companies_data))
        year_data = {}
        if len(company) != 0:
            year_data = company[0].get("years_data",{}).get(year,{})

         # pandas dataframe
         # --> json formqt

        print(year_data)
        print('***************')
        print(jsonify({"year_data": year_data}))

        return jsonify({"year_data": year_data})


def get_data_from_json():
    with open(JSON_FILE_PATH,'r') as json_file:
        data = json.loads(json_file.read())
        json_file.close()
    companies_data = data.get('companies_data',[])
    return companies_data