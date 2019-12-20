function Contact(id, firstName, lastName, phoneNumber, cellPhoneNumber, address) {
    this.id = id;
    this.fullName = firstName + " " + lastName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.cellPhoneNumber = cellPhoneNumber;
    this.address = address;
}


Contact.prototype.getContactJson = function(){
    return {
        id : this.id,
        fullName : this.fullName,
        firstName : this.firstName,
        lastName : this.lastName,
        phoneNumber : this.phoneNumber,
        cellPhoneNumber : this.cellPhoneNumber,
        address : this.address,
    }
};

Contact.prototype.setId = function(id){
    this.id = id;
};

Contact.prototype.isValid = function(){

    let isEmpty = function(str){
        return (!str || str.length === 0);
    };

    if(!isEmpty(this.firstName) && !isEmpty(this.lastName) && !isEmpty(this.phoneNumber)
        && !isEmpty(this.cellPhoneNumber) && !isEmpty(this.address)){

        this.firstName = this.firstName.replace(/\W/g, '');
        this.lastName = this.lastName.replace(/\W/g, '');
        this.fullName = this.firstName + " " + this.lastName;

        return /^[a-zA-Z]+$/.test(this.firstName) && this.firstName.length < 15
            && /^[a-zA-Z]+$/.test(this.lastName) && this.lastName.length < 15
            && /\d/.test(this.phoneNumber) && this.phoneNumber.length > 5
            && /\d/.test(this.cellPhoneNumber) && this.cellPhoneNumber.length > 5
            && this.address.length > 5;
    }

    return false;
};

Contact.prototype.equals = function(obj){

    return this.firstName === obj.firstName &&
        this.lastName === obj.lastName &&
        this.phoneNumber === obj.phoneNumber &&
        this.cellPhoneNumber === obj.cellPhoneNumber &&
        this.address === obj.address;
};

module.exports = Contact;