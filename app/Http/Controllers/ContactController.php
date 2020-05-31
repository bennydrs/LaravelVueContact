<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Resources\ContactResource;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return ContactResource::collection($contacts);
    }

    public function show($id)
    {
        return Contact::findOrFail($id);
    }

    public function store(Request $request)
    {
        return Contact::create($request->all());
    }

    public function update(Request $request)
    {
        $contact = Contact::findOrFail($request->id);
        $contact->update($request->all());
        return $contact;
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return 204;
    }
}
