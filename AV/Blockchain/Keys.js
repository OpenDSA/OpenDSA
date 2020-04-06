/*global alert: true, console: true, ODSA */
// Written by Bailey Spell and Jesse Terrazas
$(document).ready(function() {
    "use strict";
    // this is used to clear the localStorage object
    // when the page refreshs
    var publicKey = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALcBngkl9Jb2BbA7HnYx2+gyCawIAjMbuKcR9U6V0JIz0blUFPtwEA5/35kE4ueMRYXeQ0KYJdpN1bUn+9zA0lUCAwEAAQ==";
    var privateKey = "MIIBOwIBAAJBALcBngkl9Jb2BbA7HnYx2+gyCawIAjMbuKcR9U6V0JIz0blUFPtwEA5/35kE4ueMRYXeQ0KYJdpN1bUn+9zA0lUCAwEAAQJABGR4i5WqojjzeABjQcj+kzsoOkXS77EZpIDs118HK4siVdTkhvnZ8wJ8qSNlXGatP5Ep/ItxdRykDOQaP1tYAQIhAP5gcSiKE330JFS0Kx0ue3gXsWefcjKxXAu7YuwAlXRVAiEAuCyVEov9ifz+BF0casfekiapmCUc1fAhSNTNLT4L5gECIQCcD3D9DRD+Uh1D9jEJOy42tFp7l1/JZ/RvoiwDXCxU7QIgG1irTdSxccK56OX2aTiCKMtK1Ud1b6K3HnxSdsxGsgECIQDsPdr3FFsYchbsb+rIoaIkQoC6h8H7eRF4YOCQE67hHQ==";
    
    $(() => {
        localStorage.clear();
        $(".publicKey").val(publicKey);
        $(".privateKey").val(privateKey);
    });

    function copyKey() {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        
        if (this.id === "copyPublicKey") {
            dummy.value = $(".publicKey").val();
        }
        else if (this.id === "copyPrivateKey") {
            dummy.value = $(".privateKey").val();
        }

        dummy.select();
        document.execCommand("copy");
        dummy.remove();
    }

    $("#copyPublicKey").click(copyKey);
    $("#copyPrivateKey").click(copyKey);
});