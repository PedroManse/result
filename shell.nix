
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShellNoCC {
    nativeBuildInputs = with pkgs.buildPackages; [ hello ];
}

