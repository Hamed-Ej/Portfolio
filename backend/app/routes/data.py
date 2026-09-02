from flask import Blueprint, jsonify

data_bp = Blueprint('data_bp', __name__)

@data_bp.route('/status', methods=['GET'])
def get_status():
    return jsonify({'status': 'online', 'message': 'Hamed Ejbari Portfolio Backend API'})

@data_bp.route('/profile', methods=['GET'])
def get_profile():
    return jsonify({
        'bio': 'Health teacher by vocation. Computer systems engineer by obsession. I believe the human body is the most complex machine in existence—I study it for a living, and I optimize it with code.',
        'skills': [
            {'id': '01', 'name': 'LINUX', 'detail': 'Because root access is the only access that matters.'},
            {'id': '02', 'name': 'PYTHON', 'detail': 'The glue that automates the chaos.'},
            {'id': '03', 'name': 'HARDWARE', 'detail': 'Knowing how the metal talks to the logic.'}
        ]
    })

@data_bp.route('/projects', methods=['GET'])
def get_projects():
    return jsonify([
        {
            'name': 'Password-Generator',
            'desc': 'Flexible, user-friendly password generator with multiple modes, built with Python.',
            'url': 'https://github.com/Hamed-Ej/Password-Generator'
        },
        {
            'name': 'Currency-Converter',
            'desc': 'A simple, well-documented currency converter built with Python and Streamlit.',
            'url': 'https://github.com/Hamed-Ej/Currency-Converter'
        },
        {
            'name': 'Drawpad',
            'desc': 'A really simple and minimal app that works like a whiteboard developed using PowerShell.',
            'url': 'https://github.com/Hamed-Ej/Drawpad'
        },
        {
            'name': 'ai-agent',
            'desc': 'A small chat-based function-calling agent with a tiny calculator utility.',
            'url': 'https://github.com/Hamed-Ej/ai-agent'
        }
    ])

