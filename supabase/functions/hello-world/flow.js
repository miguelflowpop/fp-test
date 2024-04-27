/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from "npm:axios";
import { createClient } from "npm:@supabase/supabase-js";

const supabaseUrl = "https://tharvruwgfergzpajzol.supabase.co"; // Replace with your Supabase project URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoYXJ2cnV3Z2Zlcmd6cGFqem9sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDgwMjQyOCwiZXhwIjoyMDI2Mzc4NDI4fQ.ylMxAc_qnkGbH8Y48GwToIODoGeqkiIAA3EPIg9Pnuo"; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchBusinessesFromSupabase() {
  let { data: businesses, error } = await supabase
    .from("business")
    .select("id, name");

  if (error) {
    console.error("Error fetching businesses from Supabase:", error);
    return []; // or handle the error as needed
  }
  console.log("Businesses fetched from Supabase:", businesses);
  // Map through businesses and convert id to string
  businesses = businesses.map((item) => ({
    id: item.id.toString(), // This converts the id to a string
    title: item.name, // Rename the 'name' key to 'title'
  }));
  return businesses; // this will be an array of objects with id and title properties
}

async function fetchSpaceForBusinessFromSupabase(businessId) {
  let { data: space, error } = await supabase
    .from("space") // Assuming 'spaces' is your table name
    .select("id, name") // Adjust if you need specific columns
    .eq("business_id", businessId); // 'business_id' is the foreign key column in 'spaces' table

  if (error) {
    console.error("Error fetching spaces for business ID:", businessId, error);
    return []; // Return an empty array or handle as needed
  }

  console.log(`Spaces fetched for business ID ${businessId}:`, space);
  // Map through businesses and convert id to string
  space = space.map((item) => ({
    id: item.id.toString(), // This converts the id to a string
    title: item.name, // Rename the 'name' key to 'title'
  }));
  return space; // This will be an array of space objects associated with the business
}

async function fetchFolderForSpaceFromSupabase(spaceId) {
  let { data: folder, error } = await supabase
    .from("folder") // Assuming 'folder' is your table name
    .select("id, name") // Adjust if you need specific columns
    .eq("space_id", spaceId); // 'space_id' is the foreign key column in 'folder' table

  if (error) {
    console.error("Error fetching folder for space ID:", spaceId, error);
    return []; // Return an empty array or handle as needed
  }
  console.log(`Folder fetched for space ID ${spaceId}:`, folder);
  folder = folder.map((item) => ({
    id: item.id.toString(),
    title: item.name,
  }));
  return folder;
}

async function fetchListForFolderFromSupabase(folderId) {
  let { data: list, error } = await supabase
    .from("list") // Assuming 'list' is your table name
    .select("id, name") // Adjust if you need specific columns
    .eq("folder_id", folderId); // 'folder_id' is the foreign key column in 'list' table
  if (error) {
    console.error("Error fetching list for folder ID:", folderId, error);
    return []; // Return an empty array or handle as needed
  }
  console.log(`List fetched for folder ID ${folderId}:`, list);
  // Map through list and convert id to string
  list = list.map((item) => ({
    id: item.id.toString(), // This converts the id to a string
    title: item.name, // Rename the 'name' key to 'title'
  }));
  return list;
}

// this object is generated from Flow Builder under "..." > Endpoint > Snippets > Responses
const SCREEN_RESPONSES = {
  SELECT_ACTION: {
    version: "3.0",
    screen: "SELECT_ACTION",
    data: {
      action_taken: [
        { id: "1", title: "Equipo jejejej" },
        { id: "2", title: "Equipo 2" },
        { id: "3", title: "Equipo 3" },
      ],
      is_action_required: true,
      is_action_enabled: true,
      is_action_visible: true,
    },
  },
  SELECT_BUSINESS: {
    version: "3.0",
    screen: "SELECT_BUSINESS",
    data: {
      business: [
        { id: "1", title: "Equipo jejejej" },
        { id: "2", title: "Equipo 2" },
        { id: "3", title: "Equipo 3" },
      ],
      is_business_required: true,
      is_business_enabled: true,
      is_business_visible: true,
    },
  },
  SELECT_SPACE: {
    version: "3.0",
    screen: "SELECT_SPACE",
    data: {
      space: [
        { id: "1", title: "Equipo jejejej" },
        { id: "2", title: "Equipo 2" },
        { id: "3", title: "Equipo 3" },
      ],
      is_space_required: true,
      is_space_enabled: true,
      is_space_visible: true,
    },
  },
  SELECT_FOLDER: {
    version: "3.0",
    screen: "SELECT_FOLDER",
    data: {
      folder: [
        { id: "1", title: "Equipo jejejej" },
        { id: "2", title: "Equipo 2" },
        { id: "3", title: "Equipo 3" },
      ],
      is_folder_required: true,
      is_folder_enabled: true,
      is_folder_visible: true,
    },
  },
  SELECT_LIST: {
    version: "3.0",
    screen: "SELECT_LIST",
    data: {
      list: [
        { id: "1", title: "Equipo jejejej" },
        { id: "2", title: "Equipo 2" },
        { id: "3", title: "Equipo 3" },
      ],
      is_list_required: true,
      is_list_enabled: true,
      is_list_visible: true,
    },
  }/*,
  CREAR_TAREA: {
    version: "3.0",
    screen: "CREAR_TAREA",
    data: {
      equipo: "beauty",
      folder: "1",
      lista: "2024-01-01",
      plantilla: "11:30",
    },
  },
  RESUMEN: {
    version: "3.0",
    screen: "RESUMEN",
    data: {
      appointment:
        "Beauty & Personal Care Department at Kings Cross, London\nMon Jan 01 2024 at 11:30.",
      details:
        "Name: John Doe\nEmail: john@example.com\nPhone: 123456789\n\nA free skin care consultation, please",
      equipo: "beauty",
      folder: "1",
      lista: "2024-01-01",
      plantilla: "11:30",
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
      more_details: "A free skin care consultation, please",
    },
  },
  TERMS: {
    version: "3.0",
    screen: "TERMS",
    data: {},
  },
  SUCCESS: {
    version: "3.0",
    screen: "SUCCESS",
    data: {
      extension_message_response: {
        params: {
          flow_token: "REPLACE_FLOW_TOKEN",
          some_param_name: "PASS_CUSTOM_VALUE",
        },
      },
    },
  },*/
};

export const getNextScreen = async (decryptedBody) => {
  const { screen, data, version, action, flow_token } = decryptedBody;
  // handle health check request
  if (action === "ping") {
    return {
      version,
      data: {
        status: "active",
      },
    };
  }

  // handle error notification
  if (data?.error) {
    console.warn("Received client error:", data);
    return {
      version,
      data: {
        acknowledged: true,
      },
    };
  }

  // handle initial request when opening the flow and display SELECCIONAR_PLANTILLA screen
  if (action === "INIT") {
    let business = await fetchBusinessesFromSupabase();
    let action_taken = [];
    if (business.length > 0) {
      // User has one or more businesses, offer all actions
      action_taken = [
        { id: "1", title: "Crear reporte" },
        { id: "2", title: "Actualizar reporte" },
        { id: "3", title: "Ver reportes" },
        { id: "4", title: "Ver documentos" },
        { id: "5", title: "Darse de baja" },
      ];
    } else {
      // User has no businesses, offer only the unsubscribe action
      action_taken = [{ id: "5", title: "Darse de baja" }];
    }
    console.log("action_taken:", action_taken);
    return {
      ...SCREEN_RESPONSES.SELECT_ACTION,
      data: {
        ...SCREEN_RESPONSES.SELECT_ACTION.data,
        action_taken,
        is_action_required: true,
        is_action_enabled: true,
        is_action_visible: true,
      },
    };
  }
  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      case "SELECT_ACTION":
        if ((data.trigger === "action_selected") & (data.action_taken === "1")) {
          let business = await fetchBusinessesFromSupabase();
          let is_business_required = true;
          let is_business_enabled = true;
          let is_business_visible = true;
          return {
            ...SCREEN_RESPONSES.SELECT_BUSINESS,
            data: {
              business,
              is_business_required,
              is_business_enabled,
              is_business_visible,
              ...data,
            },
          };
        }
      case "SELECT_BUSINESS":
        if (data.trigger === "business_selected") {
          let space = await fetchSpaceForBusinessFromSupabase(data.business);
          let is_space_required = true;
          let is_space_enabled = true;
          let is_space_visible = true;
          return {
            ...SCREEN_RESPONSES.SELECT_SPACE,
            data: {
              space,
              is_space_required,
              is_space_enabled,
              is_space_visible,
              ...data,
            },
          };
        }
      case "SELECT_SPACE":
        if (data.trigger === "space_selected") {
          let folder = await fetchFolderForSpaceFromSupabase(data.space);
          let is_folder_required = true;
          let is_folder_enabled = true;
          let is_folder_visible = true;
          return {
            ...SCREEN_RESPONSES.SELECT_FOLDER,
            data: {
              folder,
              is_folder_required,
              is_folder_enabled,
              is_folder_visible,
              ...data,
            },
          };
        }
      case "SELECT_FOLDER":
        if (data.trigger === "folder_selected") {
          let list = await fetchListForFolderFromSupabase(data.folder);
          let is_list_required = true;
          let is_list_enabled = true;
          let is_list_visible = true;
          return {
            ...SCREEN_RESPONSES.SELECT_LIST,
            data: {
              list,
              is_list_required,
              is_list_enabled,
              is_list_visible,
              ...data,
            },
          };
        }

      /*// handles when user interacts with SELECCIONAR_PLANTILLA screen
      case "SELECCIONAR_PLANTILLA":
        let equipo = usuarioEquipoMapping.id_usuario;
        // Determine folder options based on the selected "equipo"
        let is_folder_required = Boolean(data.equipo);
        let is_folder_enabled = Boolean(data.equipo);
        let is_folder_visible = Boolean(data.equipo);
        let filteredFolders =
          SCREEN_RESPONSES.SELECCIONAR_PLANTILLA.data.folder.slice(0, 3);
        let is_lista_required = Boolean(data.equipo) && Boolean(data.folder);
        let is_lista_enabled = Boolean(data.equipo) && Boolean(data.folder);
        let is_lista_visible = Boolean(data.equipo) && Boolean(data.folder);
        let filteredListas =
          SCREEN_RESPONSES.SELECCIONAR_PLANTILLA.data.lista.slice(0, 3);
        let is_plantilla_required =
          Boolean(data.equipo) && Boolean(data.folder) && Boolean(data.lista);
        let is_plantilla_enabled =
          Boolean(data.equipo) && Boolean(data.folder) && Boolean(data.lista);
        let is_plantilla_visible =
          Boolean(data.equipo) && Boolean(data.folder) && Boolean(data.lista);
        let filteredPlantillas =
          SCREEN_RESPONSES.SELECCIONAR_PLANTILLA.data.plantilla.slice(0, 3);
        let is_caption_visible = false;
        if (data.equipo) {
          // Fetch folders based on the selected equipo
          const fetchFoldersForEquipo_response = await fetchFoldersForEquipo(
            data.equipo
          );
          const equipoFolderMapping = fetchFoldersForEquipo_response;
          // Map selected ids
          filteredFolders = equipoFolderMapping[data.equipo] || [];
          console.log("filteredFolders:", filteredFolders);
          if (data.folder) {
            // Fetch listas based on the selected folder
            const fetchListasForFolder_response = await fetchListasForFolder(
              data.equipo,
              data.folder
            );
            const folderListaMapping = fetchListasForFolder_response;
            // Map selected ids
            filteredListas = folderListaMapping[data.folder] || [];
            console.log("filteredListas:", filteredListas);
          }
        }
        if (data.trigger === "lista_selected") {
          let TextInput_1 = "Nombre de tarea";
          let TextInput_1_is_required = true;
          let TextInput_1_is_enabled = true;
          let TextInput_1_is_visible = true;
          let TextArea_1 = "Descripción";
          let TextArea_1_is_required = false;
          let TextArea_1_is_enabled = true;
          let TextArea_1_is_visible = true;
          let Dropdown_1 = "Estatus";
          let Dropdown_1_data_source = [
            { id: "1", title: "Abierto" },
            { id: "2", title: "Cerrado" },
          ];
          let Dropdown_1_is_required = true;
          let Dropdown_1_is_enabled = true;
          let Dropdown_1_is_visible = true;
          let Dropdown_2 = "Responsable";
          let Dropdown_2_data_source = [
            { id: "1", title: "Agus" },
            { id: "2", title: "Miguel" },
          ];
          let Dropdown_2_is_required = false;
          let Dropdown_2_is_enabled = true;
          let Dropdown_2_is_visible = true;
          let Dropdown_3 = "Prioridad";
          let Dropdown_3_data_source = [
            { id: "1", title: "Baja 🟢" },
            { id: "2", title: "Media 🟡" },
            { id: "3", title: "Alta 🔴" },
          ];
          let Dropdown_3_is_required = false;
          let Dropdown_3_is_enabled = true;
          let Dropdown_3_is_visible = true;
          let DatePicker_1 = "Fecha";
          let DatePicker_1_is_required = false;
          let DatePicker_1_is_enabled = true;
          let DatePicker_1_is_visible = true;
          let OptIn_1 = "Anexar imágen";
          let OptIn_1_is_required = false;
          let OptIn_1_is_visible = true;
          let OptIn_2 = "Anexar ubicación";
          let OptIn_2_is_required = false;
          let OptIn_2_is_visible = true;
          return {
            ...SCREEN_RESPONSES.CREAR_TAREA,
            data: {
              TextInput_1,
              TextInput_1_is_required,
              TextInput_1_is_enabled,
              TextInput_1_is_visible,
              TextArea_1,
              TextArea_1_is_required,
              TextArea_1_is_enabled,
              TextArea_1_is_visible,
              Dropdown_1,
              Dropdown_1_data_source,
              Dropdown_1_is_required,
              Dropdown_1_is_enabled,
              Dropdown_1_is_visible,
              Dropdown_2,
              Dropdown_2_data_source,
              Dropdown_2_is_required,
              Dropdown_2_is_enabled,
              Dropdown_2_is_visible,
              Dropdown_3,
              Dropdown_3_data_source,
              Dropdown_3_is_required,
              Dropdown_3_is_enabled,
              Dropdown_3_is_visible,
              DatePicker_1,
              DatePicker_1_is_required,
              DatePicker_1_is_enabled,
              DatePicker_1_is_visible,
              OptIn_1,
              OptIn_1_is_required,
              OptIn_1_is_visible,
              OptIn_2,
              OptIn_2_is_required,
              OptIn_2_is_visible,
              ...data,
            },
          };
        }
        return {
          ...SCREEN_RESPONSES.SELECCIONAR_PLANTILLA,
          data: {
            // copy initial screen data then override specific fields
            ...SCREEN_RESPONSES.SELECCIONAR_PLANTILLA.data,
            // each field is enabled only when previous fields are selected
            equipo,
            is_folder_required,
            is_folder_enabled,
            is_folder_visible,
            folder: filteredFolders.map((folder) => ({
              id: folder.id,
              title: folder.title,
            })),
            is_lista_required,
            is_lista_enabled,
            is_lista_visible,
            lista: filteredListas.map((lista) => ({
              id: lista.id,
              title: lista.title,
            })),
            is_plantilla_required,
            is_plantilla_enabled,
            is_plantilla_visible,
            plantilla: filteredPlantillas.map((plantilla) => ({
              id: plantilla.id,
              title: plantilla.title,
            })),
            is_caption_visible,
          },
        }; 

      // handles when user completes CREAR_TAREA screen
      case "CREAR_TAREA":
        return {
          ...SCREEN_RESPONSES.RESUMEN,
          data: {
            // return the same fields sent from client back to submit in the next step
            ...data,
          },
        };

      // handles when user completes RESUMEN screen
      case "RESUMEN":
        // send success response to complete and close the flow
        return {
          ...SCREEN_RESPONSES.SUCCESS,
          data: {
            extension_message_response: {
              params: {
                flow_token,
              },
            },
          },
        }*/;

      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};
